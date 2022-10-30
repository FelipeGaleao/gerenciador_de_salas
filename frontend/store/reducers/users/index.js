import { HYDRATE } from "next-redux-wrapper";
import { USER_UPDATE, USER_RESET } from "../../actions";

const initialState = {
    access_token: null,
    atualizado_por: null,
    criado_por: null,
    dt_atualizacao: null,
    dt_criacao: null,
    email: null,
    id: null,
    lotacao: null,
    nome: null,
    refresh_token: null,
    sobrenome: null,
    tipo_usuario: null,
};

const user_data = [];

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, ...action.payload.user };

    case "USER_UPDATE":
      const newState = { ...state, ...action.payload };
      return newState;

    case "USER_RESET":
      return initialState;
      
    default:
      return state;
  }
};

export default userReducer;