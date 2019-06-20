export default {
  HOME: '/',
  USER: '/user/:id',
  SWAPI: {
    path: '/swapi/:type/:id',
    thunk: async (dispatch, getState) => {
      // Will only match this route if type and id are set. For optional segments, use ".../:type?/:id?".
      const { type, id } = getState().location.payload
      const url = `https://swapi.co/api/${type}/${id}`

      try {
        const response = await fetch(url)
        if (response.ok) {
          const data = await response.json()
          // Note that only one action is required, since fetching is triggered by the router.
          dispatch({ type: 'SWAPI_FETCHED', payload: { data } })
          return
        }
      } catch (_) {}
      // Something went wrong, update the response data with the API's usage overview, without changing route.
      dispatch({ type: 'SWAPI_HELP' })
    }
  },
  // Below is a _pathless_ route! Despite being defined in routesMap, it's not connected to the route,
  // but is supported in order to have a uniform thunk interface even when routes are not involved.
  // Defining all "setup" actions this way helps structure the app and reduce Redux boilerplate.
  SWAPI_HELP: {
    thunk: async (dispatch, getState) => {
      const action = { type: 'SWAPI_FETCHED', payload: { hasError: true } };
      try {
        const response = await fetch('https://swapi.co/api/')
        action.payload.data = response.ok ? await response.json() : `Status: ${response.status}`
      } catch (error) {
        action.payload.data = `Error: ${error.message}`
      }
      dispatch(action)
    }
  }
}
