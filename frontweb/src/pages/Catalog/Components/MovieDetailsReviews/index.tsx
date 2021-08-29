import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { makePrivateRequest } from '../../../../util/request';
import { toast } from 'react-toastify';
import './styles.css';

type ParamsType = {
  id: string;
};

type FormState = {
  text: string;
  movieId: number;
};

const MovieDetailsReviews = ({ id }: ParamsType) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>();
  const history = useHistory();

  const onSubmit = (data: FormState) => {
    data.movieId = parseInt(id);
    makePrivateRequest({ url: '/reviews', method: 'POST', data })
      .then((response) => {
        toast.info('Obrigado pela sua Avaliação');
        history.go(0)
      })
      .catch(() => {
        toast.error('Houve um erro de validação do seu comentário');
        console.log(data)
      });
  };

  return (
    <div className="containerform-create-reviews">
      <form onSubmit={handleSubmit(onSubmit)} className="comment-container">
        {errors.text && (
          <div className="comment-alert">A Avaliação deve ser preenchida!</div>
        )}
        <textarea
          name="text"
          placeholder="Deixe sua avaliação aqui"
          className="input-review"
          cols={2}
          rows={10}
        ></textarea>
        <button className="btn-save-review">SALVAR AVALIAÇÃO</button>
      </form>
    </div>
  );
};

export default MovieDetailsReviews;
