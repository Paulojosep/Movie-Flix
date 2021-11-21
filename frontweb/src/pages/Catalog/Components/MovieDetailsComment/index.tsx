import { ReactComponent as Star } from '../../../../assets/images/Star.svg';
import './styles.css';

type Props = {
  autorReview?: string;
  commentReview?: string;
};

const MovieDetailsComment = ({ autorReview, commentReview }: Props) => {
  return (
    <div className="container-form-list-reaviews">
      <h4 className="username-review">
        <Star />
        {autorReview}
      </h4>
      <div className="description-review">
        <span>{commentReview}</span>
      </div>
    </div>
  );
};

export default MovieDetailsComment;
