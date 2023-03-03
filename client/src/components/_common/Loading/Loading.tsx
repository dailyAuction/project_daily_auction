import { BeatLoader } from 'react-spinners';

export const Loading = () => {
  return (
    <div className="p-2">
      <BeatLoader color="#e8e2e2" margin={4} size={16} speedMultiplier={0.6} />
    </div>
  );
};
