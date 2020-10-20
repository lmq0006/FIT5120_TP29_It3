export function go (url, $router, param) {
  let query = {param: param}
  if (/^javas/.test(url) || !url) return
  const useRouter = typeof url === 'object' || ($router && typeof url === 'string' && !/http/.test(url))
  if (useRouter) {
    if (typeof url === 'object' ) {
      //console.log('url object')
      $router.replace({path: url.path, query})
    } else {
      console.log('url object is:' + url)
      url === 'BACK' ? $router.go(-1) : $router.push({path: url, query})
    }
  } else {
    window.location.href = url
  }
}

export function getUrl (url, $router) {
  // Make sure the href is right in hash mode
  if ($router && !$router._history && typeof url === 'string' && !/http/.test(url)) {
    return '#!' + url
  }
  return url && typeof url !== 'object' ? url : 'javascript:void(0);'
}
