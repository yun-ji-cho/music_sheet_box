/* eslint-disable */
// @ts-nocheck
import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import StaticAxios from 'axios'
import LRU from 'lru-cache'

const actions = {
  REQUEST_START: 'REQUEST_START',
  REQUEST_END: 'REQUEST_END',
}

const useAxios = makeUseAxios()

const { __ssrPromises, resetConfigure, configure, loadCache, serializeCache, clearCache } = useAxios

export default useAxios

export { __ssrPromises, resetConfigure, configure, loadCache, serializeCache, clearCache }

function isReactEvent(obj: any): boolean {
  return obj && obj.nativeEvent && obj.nativeEvent instanceof Event
}

function createCacheKey(config) {
  const cleanedConfig = { ...config }
  delete cleanedConfig.cancelToken

  return JSON.stringify(cleanedConfig)
}

function configToObject(config) {
  if (typeof config === 'string') {
    return {
      url: config,
    }
  }

  return config
}

export function makeUseAxios(configurationOptions) {
  let cache
  let axiosInstance

  const __ssrPromises = []

  function resetConfigure() {
    cache = new LRU()
    axiosInstance = StaticAxios
  }

  function configure(options = {}) {
    if (options.axios !== undefined) {
      axiosInstance = options.axios
    }

    if (options.cache !== undefined) {
      cache = options.cache
    }
  }

  resetConfigure()
  configure(configurationOptions)

  function loadCache(data) {
    cache.load(data)
  }

  async function serializeCache() {
    const ssrPromisesCopy = [...__ssrPromises]

    __ssrPromises.length = 0

    await Promise.all(ssrPromisesCopy)

    return cache.dump()
  }

  function clearCache() {
    cache.reset()
  }

  return Object.assign(useAxios, {
    __ssrPromises,
    resetConfigure,
    configure,
    loadCache,
    serializeCache,
    clearCache,
  })

  function tryStoreInCache(config, response) {
    if (!cache) {
      return
    }

    const cacheKey = createCacheKey(config)

    const responseForCache = { ...response }
    delete responseForCache.config
    delete responseForCache.request

    cache.set(cacheKey, responseForCache)
  }

  function createInitialState(config, options) {
    const response = !options.manual && tryGetFromCache(config, options)

    return {
      loading: !options.manual && !response,
      error: null,
      ...(response ? { data: response.data, response } : null),
    }
  }

  function reducer(state, action) {
    switch (action.type) {
      case actions.REQUEST_START:
        return {
          ...state,
          loading: true,
          error: null,
        }
      case actions.REQUEST_END:
        if (action.error && action.error.code !== 'ECONNABORTED' && action.error.response) {
          window.dispatchEvent(
            new CustomEvent('axiosError', {
              detail: {
                message: action.payload,
              },
            })
          )
        }
        return {
          ...state,
          loading: false,
          ...(action.error ? {} : { data: action.payload.data }),
          [action.error ? 'error' : 'response']: action.payload,
        }
    }
  }

  function tryGetFromCache(config, options, dispatch) {
    if (!cache || !options.useCache) {
      return
    }

    const cacheKey = createCacheKey(config)
    const response = cache.get(cacheKey)

    if (response && dispatch) {
      dispatch({ type: actions.REQUEST_END, payload: response })
    }

    return response
  }

  async function executeRequest(config, dispatch) {
    try {
      dispatch({ type: actions.REQUEST_START })

      const response = await axiosInstance(config)

      tryStoreInCache(config, response)

      dispatch({ type: actions.REQUEST_END, payload: response })

      return response
    } catch (err) {
      if (!StaticAxios.isCancel(err)) {
        dispatch({ type: actions.REQUEST_END, payload: err, error: true })
      }

      throw err
    }
  }

  async function request(config, options, dispatch) {
    return tryGetFromCache(config, options, dispatch) || executeRequest(config, dispatch)
  }

  function useAxios(config, options) {
    config = useMemo(() => configToObject(config), [JSON.stringify(config)])

    options = useMemo(() => ({ manual: false, useCache: true, ...options }), [JSON.stringify(options)])

    const cancelSourceRef = useRef()

    const [state, dispatch] = useReducer(reducer, createInitialState(config, options))

    if (typeof window === 'undefined' && !options.manual) {
      useAxios.__ssrPromises.push(axiosInstance(config))
    }

    const cancelOutstandingRequest = useCallback(() => {
      if (cancelSourceRef.current) {
        cancelSourceRef.current.cancel()
      }
    }, [])

    const withCancelToken = useCallback(
      (config) => {
        cancelOutstandingRequest()

        cancelSourceRef.current = StaticAxios.CancelToken.source()

        config.cancelToken = cancelSourceRef.current.token

        return config
      },
      [cancelOutstandingRequest]
    )

    useEffect(() => {
      if (!options.manual) {
        request(withCancelToken(config), options, dispatch).catch(() => {})
      }

      return cancelOutstandingRequest
    }, [config, options, withCancelToken, cancelOutstandingRequest])

    const refetch = useCallback(
      (configOverride, options) => {
        configOverride = configToObject(configOverride)

        return request(
          withCancelToken({
            ...config,
            ...(isReactEvent(configOverride) ? null : configOverride),
          }),
          { useCache: false, ...options },
          dispatch
        )
      },
      [config, withCancelToken]
    )

    return [state, refetch]
  }
}
