package com.project.dailyAuction.boardImage.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;
import com.project.dailyAuction.board.entity.Board;
import com.project.dailyAuction.board.repository.BoardRepository;
import com.project.dailyAuction.boardImage.entity.BoardImage;
import com.project.dailyAuction.boardImage.repository.BoardImageRepository;
import com.project.dailyAuction.member.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnails;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class ImageHandler {
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3 amazonS3;

    private final BoardRepository boardRepository;

    private final BoardImageRepository boardImageRepository;

    public String updateAvatar(MultipartFile image, Member member) throws IOException {
        String absolutePath = new File("").getAbsolutePath() + "/";
        // 저장 경로 설정
        String path = "images/avatar";
        File file = new File(path);
        if (!file.exists()) {
            file.mkdirs();
        }

        String contentType = image.getContentType();
        String originalFileExtension = ".jpg";
        // 확장자 명이 없으면 잘못된 파일이므로 중지

        if (contentType.contains("image/jpeg")) {
            originalFileExtension = ".jpg";
        } else if (contentType.contains("image/jpg")) {
            originalFileExtension = ".jpg";
        } else if (contentType.contains("image/png")) {
            originalFileExtension = ".png";
        } else if (contentType.contains("image/gif")) {
            originalFileExtension = ".gif";
        } else if (contentType.contains("image/heic")) {
            originalFileExtension = ".heic";
        }

        String newFileName = "avatar_of_" + member.getMemberId() + originalFileExtension;

        // 저장된 파일로 변경하여 이를 보여주기
        file = new File(absolutePath + path + "/" + newFileName);
        image.transferTo(file);

        Thumbnails.of(file).size(100, 100).outputFormat("png").toFile(file);

        FileItem fileItem = new DiskFileItem("mainFile", Files.probeContentType(file.toPath()), false, file.getName(), (int) file.length(), file.getParentFile());

        try {
            InputStream input = new FileInputStream(file);
            OutputStream os = fileItem.getOutputStream();
            IOUtils.copy(input, os);
            // Or faster..
            // IOUtils.copy(new FileInputStream(file), fileItem.getOutputStream());
        } catch (IOException ex) {
            // do something.
        }

        MultipartFile multipartFile = new CommonsMultipartFile(fileItem);

        String avatarName = "member_avatar/" + System.nanoTime() + "avatar_of_" + member.getMemberId();

        try {
            ObjectMetadata metadata = new ObjectMetadata();
            byte[] bytes = IOUtils.toByteArray(multipartFile.getInputStream());
            metadata.setContentType(contentType);
            metadata.setContentLength(bytes.length);
            ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);

            amazonS3.putObject(new PutObjectRequest(bucket, avatarName, byteArrayInputStream, metadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));

        } catch (AmazonServiceException e) {
            e.printStackTrace();
        } catch (SdkClientException e) {
            e.printStackTrace();
        }

        // s3에 업로드 후 ec2 파일은 제거
        file.delete();

        return "http://daily-auction-bucket.s3-website.ap-northeast-2.amazonaws.com/" + avatarName;
    }

    public List<BoardImage> saveImageOnS3(Board board, List<MultipartFile> multipartFiles) throws IOException {
        List<BoardImage> images = new ArrayList<>();

        if (multipartFiles.isEmpty()) {
            return images;
        }

        for (int i = 0; i < multipartFiles.size(); i++) {
            MultipartFile image = multipartFiles.get(i);

            String fileName = "board_images/" + board.getBoardId() + "board_" + System.nanoTime() ;
            String thumbnailName = "board_thumbnail/" + System.nanoTime() + "thumbnail_of_" + board.getBoardId();

            //파일 형식 구하기
            if (!image.isEmpty()) {
                // 확장자 명 검증 절차
                String contentType = image.getContentType();
                String originalFileExtension;
                // 확장자 명이 없으면 잘못된 파일이므로 중지
                if (ObjectUtils.isEmpty(contentType)) {
                    break;
                } else {
                    if (contentType.contains("image/jpeg")) {
                        originalFileExtension = ".jpg";
                    } else if (contentType.contains("image/jpg")) {
                        originalFileExtension = ".jpg";
                    } else if (contentType.contains("image/png")) {
                        originalFileExtension = ".png";
                    } else if (contentType.contains("image/gif")) {
                        originalFileExtension = ".gif";
                    } else if (contentType.contains("image/heic")) {
                        originalFileExtension = ".heic";
                    } else {
                        break;
                    }
                    //content type을 지정해서 올려주지 않으면 자동으로 "application/octet-stream"으로 고정이 되서 링크 클릭시 웹에서 열리는게 아니라 자동 다운이 시작됨.

                    try {
                        ObjectMetadata metadata = new ObjectMetadata();
                        byte[] bytes = IOUtils.toByteArray(image.getInputStream());
                        metadata.setContentType(contentType);
                        metadata.setContentLength(bytes.length);
                        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);

                        amazonS3.putObject(new PutObjectRequest(bucket, fileName, byteArrayInputStream, metadata)
                                .withCannedAcl(CannedAccessControlList.PublicRead));

                    } catch (AmazonServiceException e) {
                        e.printStackTrace();
                    } catch (SdkClientException e) {
                        e.printStackTrace();
                    }

                    BoardImage boardImage = BoardImage.builder()
                            .board(board)
                            .originalFileName(fileName)
                            .storedFilePath(amazonS3.getUrl(bucket, fileName).toString())
                            .fileSize(image.getSize())
                            .build();

                    images.add(boardImage);

                    if (i == 0) {
                        String absolutePath = new File("").getAbsolutePath() + "/";
                        // 저장 경로 설정
                        String path = "images";
                        File file = new File(path);

                        // 디렉토리가 없을 때 생성
                        if (!file.exists()) {
                            file.mkdirs();
                        }

                        String newFileName = System.nanoTime() + originalFileExtension;

                        file = new File(absolutePath + path + "/" + newFileName);
                        image.transferTo(file);

                        makeThumbnail(file, board, contentType, thumbnailName);
                    }
                }
            }
        }
        return images;
    }

    public void makeThumbnail(File file, Board board, String contentType, String thumbnailName) throws IOException {
        Thumbnails.of(file).size(300, 300).outputFormat("png").toFile(file);

        FileItem fileItem = new DiskFileItem("mainFile", Files.probeContentType(file.toPath()), false, file.getName(), (int) file.length(), file.getParentFile());

        try {
            InputStream input = new FileInputStream(file);
            OutputStream os = fileItem.getOutputStream();
            IOUtils.copy(input, os);
            // Or faster..
            // IOUtils.copy(new FileInputStream(file), fileItem.getOutputStream());
        } catch (IOException ex) {
            // do something.
        }

        MultipartFile multipartFile = new CommonsMultipartFile(fileItem);

        try {
            ObjectMetadata metadata = new ObjectMetadata();
            byte[] bytes = IOUtils.toByteArray(multipartFile.getInputStream());
            metadata.setContentType(contentType);
            metadata.setContentLength(bytes.length);
            ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);

            amazonS3.putObject(new PutObjectRequest(bucket, thumbnailName, byteArrayInputStream, metadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));

        } catch (AmazonServiceException e) {
            e.printStackTrace();
        } catch (SdkClientException e) {
            e.printStackTrace();
        }

        board.setThumbnail("http://daily-auction-bucket.s3-website.ap-northeast-2.amazonaws.com/" + thumbnailName);
        boardRepository.save(board);
        // s3에 업로드 후 ec2 파일은 제거
        file.delete();
    }

    public List<BoardImage> updateImages(Board board, List<String> priority, List<MultipartFile> multipartFiles, List<String> urls) throws IOException {
        log.info("# Run updateImages");

        List<BoardImage> boardImages = new ArrayList<>();

        List<BoardImage> originBoardImages = boardImageRepository.findAllByBoard(board);

        for (int i = 0; i < priority.size(); i++) {
            String next = priority.get(i);
            String fileName = "board_images/" + board.getBoardId() + "board_" + System.nanoTime();
            String thumbnailName = "board_thumbnail/" + System.nanoTime() + "thumbnail_of_" + board.getBoardId();
            // 이미지 처리
            if (next.equals("i")) {
                log.info("# Run 'i' access");
                MultipartFile image = multipartFiles.remove(0);

                //파일 형식 구하기
                if (!image.isEmpty()) {
                    // 확장자 명 검증 절차
                    String contentType = image.getContentType();
                    String originalFileExtension;
                    // 확장자 명이 없으면 잘못된 파일이므로 중지
                    if (ObjectUtils.isEmpty(contentType)) {
                        break;
                    } else {
                        if (contentType.contains("image/jpeg")) {
                            originalFileExtension = ".jpg";
                        } else if (contentType.contains("image/jpg")) {
                            originalFileExtension = ".jpg";
                        } else if (contentType.contains("image/png")) {
                            originalFileExtension = ".png";
                        } else if (contentType.contains("image/gif")) {
                            originalFileExtension = ".gif";
                        } else if (contentType.contains("image/heic")) {
                            originalFileExtension = ".heic";
                        } else {
                            break;
                        }
                        //content type을 지정해서 올려주지 않으면 자동으로 "application/octet-stream"으로 고정이 되서 링크 클릭시 웹에서 열리는게 아니라 자동 다운이 시작됨.

                        try {
                            ObjectMetadata metadata = new ObjectMetadata();
                            byte[] bytes = IOUtils.toByteArray(image.getInputStream());
                            metadata.setContentType(contentType);
                            metadata.setContentLength(bytes.length);
                            ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);

                            amazonS3.putObject(new PutObjectRequest(bucket, fileName, byteArrayInputStream, metadata)
                                    .withCannedAcl(CannedAccessControlList.PublicRead));

                        } catch (AmazonServiceException e) {
                            e.printStackTrace();
                        } catch (SdkClientException e) {
                            e.printStackTrace();
                        }

                        BoardImage boardImage = BoardImage.builder()
                                .board(board)
                                .originalFileName(fileName)
                                .storedFilePath(amazonS3.getUrl(bucket, fileName).toString())
                                .fileSize(image.getSize())
                                .build();

                        boardImageRepository.save(boardImage);
                        boardImages.add(boardImage);

                        if (i == 0) {
                            log.info("# Run 'i' thumbnail access");
                            String absolutePath = new File("").getAbsolutePath() + "/";
                            // 저장 경로 설정
                            String path = "images";
                            File file = new File(path);

                            // 디렉토리가 없을 때 생성
                            if (!file.exists()) {
                                file.mkdirs();
                            }

                            String newFileName = System.nanoTime() + originalFileExtension;

                            file = new File(absolutePath + path + "/" + newFileName);
                            image.transferTo(file);

                            makeThumbnail(file, board, contentType, thumbnailName);
                        }
                    }
                }
                //  url 처리
            } else {
                log.info("# Run 'u' access");
                String imageUrl = urls.remove(0);

                BoardImage boardImage = boardImageRepository.findByStoredFilePath(imageUrl);

                BoardImage newBoardImage = boardImageRepository.save(BoardImage.builder()
                        .board(board)
                        .originalFileName(boardImage.getOriginalFileName())
                        .storedFilePath(boardImage.getStoredFilePath())
                        .fileSize(boardImage.getFileSize())
                        .build());
                boardImageRepository.delete(boardImage);

                boardImageRepository.save(newBoardImage);
                boardImages.add(newBoardImage);

                if (i == 0) {
                    log.info("# Run 'u' thumbnail access");
                    S3Object o = amazonS3.getObject(new GetObjectRequest(bucket, boardImage.getOriginalFileName()));
                    S3ObjectInputStream objectInputStream = ((S3Object) o).getObjectContent();
                    byte[] bytes = IOUtils.toByteArray(objectInputStream);

                    String absolutePath = new File("").getAbsolutePath() + "/";
                    // 저장 경로 설정
                    String path = "images";
                    File file = new File(path);

                    // 디렉토리가 없을 때 생성
                    if (!file.exists()) {
                        file.mkdirs();
                    }

                    Path paths = Paths.get(absolutePath + path + "/" + "temp.jpg");
                    Files.write(paths, bytes);

                    File savedImage = new File(absolutePath + path + "/" + "temp.jpg");

                    makeThumbnail(savedImage, board, "image/jpg", thumbnailName);
                }
            }
        }

        for (BoardImage boardImage : originBoardImages) {
            if (!boardImages.contains(boardImage)) {
                boardImageRepository.delete(boardImage);
            }
        }

        return boardImages;
    }
}
