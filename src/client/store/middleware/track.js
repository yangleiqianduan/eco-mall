import { getCookie } from 'common/utils'

window.__UDL_CONFIG = {pid: 'mallm', uuid: getCookie('lianjia_uuid'), c: 'H5'}

const track = async action => {
  switch (action.type) {
    default:
      console.log(action, 'track')
  }
}

export default store => next => action => {
  track(action)
  return next(action)
}
