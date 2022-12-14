import { checkResponse } from './utils';

// export const BASE_URL = 'http://localhost:3001';
// export const BASE_URL = 'http://domainname.andrey.nomoredomains.sbs/api';
export const BASE_URL = 'http://51.250.7.137/api';

//регистрация
export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => checkResponse(res));
};

//вход
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));
};

//лайк-дизлайк
export const changeLikeCardStatus = (cardId, isLiked) => {
  return fetch(`${BASE_URL}/cards/${cardId}/likes`, {
    method: `${!isLiked ? 'DELETE' : 'PUT'}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => checkResponse(res));
};

// метод делает запрос серверу и получает данные профиля
export const getUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => checkResponse(res));
};

// метод изменяет аватар на сервере
export const setUserAvatar = (data) => {
  return fetch(`${BASE_URL}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      avatar: data.avatar,
    }),
  }).then((res) => checkResponse(res));
};

// метод изменяет данные профиля на сервере
export const setUserInfo = (data) => {
  // console.log(data);
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH', //метод запроса
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    }, //заголовки запроса
    body: JSON.stringify({
      //тело запроса
      name: data.name, //в name передаем значение name объекта, переданного в setUserInfo
      email: data.email, //в about передаем значение about объекта, переданного в setUserInfo
    }),
  }).then((res) => checkResponse(res));
};

//получение всех пользователей
export const getUsers = () => {
  return fetch(`${BASE_URL}/users`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => checkResponse(res));
};

//получение конкретного пользователя
export const getUser = (id) => {
  return fetch(`${BASE_URL}/users/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => checkResponse(res));
};
