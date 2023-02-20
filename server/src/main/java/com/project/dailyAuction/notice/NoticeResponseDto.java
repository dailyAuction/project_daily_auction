package com.project.dailyAuction.notice;

import com.project.dailyAuction.board.entity.Board;
import com.project.dailyAuction.board.service.BoardService;
import com.project.dailyAuction.member.service.MemberService;
import lombok.*;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NoticeResponseDto {
    private long noticeId;
    private long boardId;
    private String boardTitle;
    private String thumbnail;
    private long statusId;
    private String contact;

    public static NoticeResponseDto create(Notice notice) {
        Board board = notice.getBoard();
        return NoticeResponseDto.builder()
                .noticeId(notice.getNoticeId())
                .boardId(board.getBoardId())
                .boardTitle(board.getTitle())
                .thumbnail(board.getThumbnail())
                .statusId(notice.getStatus())
                .contact(notice.getContact())
                .build();
    }
}
