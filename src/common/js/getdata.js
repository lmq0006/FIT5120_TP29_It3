import request from './request'

export function getborn () {
  return request({
    url: 'http://18.180.147.97:8088/born',
    method: 'get'
  })
}
export function getengskill () {
  return request({
    url: 'http://18.180.147.97:8088/engskill',
    method: 'get'
  })
}

export function getculture () {
  return request({
    url: 'http://18.180.147.97:8088/culture',
    method: 'get'
  })
}

export function getFavorite () {
  return request({
    url: 'http://18.180.147.97:8088/favorite',
    method: 'get'
  })
}

export function getAccount () {
  return request({
    url: 'http://18.180.147.97:8088/account',
    method: 'get'
  })
}

export function insertAccount (name, password) {
  const data = {
    name,
    password
  }
  return request({
    url: 'http://18.180.147.97:8088/insertaccount',
    method: 'post',
    data
  })
}

export function insertFavorite (name, item) {
  const data = {
    name,
    item
  }
  return request({
    url: 'http://18.180.147.97:8088/insertfavorite',
    method: 'post',
    data
  })
}
