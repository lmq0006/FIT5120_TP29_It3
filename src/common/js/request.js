import axios from 'axios'

axios.defaults.retry = 4
axios.defaults.retryDelay = 1000

// create an axios instance
const service = axios.create({
  baseURL: '', // api 的 base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    // if (this.$store.getters.token) {
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    var config = err.config

    if (!config || !config.retry) return Promise.reject(err);

    config.__retryCount = config.__retryCount || 0;

    if (config.__retryCount >= config.retry) {
      return Promise.reject(err);
    }

    config.__retryCount += 1;

    var backoff = new Promise(function(resolve) {
      setTimeout(function() {
        resolve();
      }, config.retryDelay || 1);
    });

    return backoff.then(function() {
      return axios(config);
    });
  }
)

export default service
