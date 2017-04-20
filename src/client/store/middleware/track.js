
window.__UDL_CONFIG = {pid: 'mallm', uuid: '20240622', c: 'H5'}

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
