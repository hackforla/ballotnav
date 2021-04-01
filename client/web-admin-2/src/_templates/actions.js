export const types = {
  ACTION_1: 'filename/ACTION_1',
  ACTION_2: 'filename/ACTION_2',
}

export const simpleActionCreator = (args) => ({
  type: types.ACTION_1,
  data: args,
})

export const thunkActionCreator = (args) => {
  return (dispatch, getState) => {
    // do something, possibly async

    dispatch({
      type: types.ACTION_2,
      data,
    })
  }
}

const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // types here

    default:
      return state
  }
}

export default reducer
