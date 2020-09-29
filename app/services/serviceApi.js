const serverUrl = "https://api.themoviedb.org/3/"

function getUrl(type) {
  return {
    "GET-DETAIL-MOVIES": serverUrl + "movie",
  }[type];
}

function getUrlApi(url, bodyParams) {
  return {
    "topRatedMoviesGet": `${serverUrl}movie/top_rated?${bodyParams}`, //done
    "upComingMoviesGet": `${serverUrl}movie/upcoming?${bodyParams}`, //done
    "popularMoviesGet": `${serverUrl}movie/popular?${bodyParams}`, //done

    "topRatedTvGet": `${serverUrl}tv/top_rated?${bodyParams}`, //done
    "popularTvGet": `${serverUrl}tv/popular?${bodyParams}`, //done
    "onTheAirTvGet": `${serverUrl}tv/on_the_air?${bodyParams}`, //done
    "onSearchMovies": `${serverUrl}search/movie?${bodyParams}`, //done
  }[url];
}

function getUrlApiDetail(url, id, bodyParams) {
  return {
    "detailMoviesGet": `${serverUrl}movie/${id}?${bodyParams}`, //done
    "detailTvGet": `${serverUrl}tv/${id}?${bodyParams}`, //done
  }[url];
}

const headers = {
  'content-type': 'application/x-www-form-urlencoded'
}

const headersFile = {
  'content-type': 'multipart/form-data'
}

const setFormData = (body) => {
  const formData = new FormData()
  Object.keys(body).forEach(key => {
    if (key == 'img' && body.img != "") {
      formData.append("img", {
        name: body.img.fileName,
        type: body.img.type,
        uri: body.img.uri
      })
    } else {
      formData.append(key, body[key]);
    }
  });
  return formData
}

const setUrlEncodedForm = (body) => {
  let urlEncodedForm = []
  for (var property in body) {
    let encodedKey = encodeURIComponent(property)
    let encodedValue = encodeURIComponent(body[property])
    urlEncodedForm.push(encodedKey + "=" + encodedValue)
  }
  let finalForm = urlEncodedForm.join("&")
  return finalForm
}

// method to get data from url api
async function getService(url, bodyParams) {
  let finalBody = bodyParams == undefined ?
    null :
    Object.entries(bodyParams).join("&").replace(/,/g, "=")
  let urlApi = getUrlApi(url, finalBody)
  try {
    let response = await fetch(urlApi, {
      headers: headers
    })
    let responseJson = await response.json()
    // console.warn(responseJson)
    return responseJson
  } catch (error) {
    console.warn('Error is: ' + error);
  }
}

async function getServicedetail(url, id, bodyParams) {
  let finalBody = bodyParams == undefined ?
    null :
    Object.entries(bodyParams).join("&").replace(/,/g, "=")
  let urlApi = getUrlApiDetail(url, id, finalBody)
  try {
    let response = await fetch(urlApi, {
      headers: headers
    })
    let responseJson = await response.json()
    // console.warn(responseJson)
    return responseJson
  } catch (error) {
    console.warn('Error is: ' + error);
  }
}

// method to post data from url api
async function postService(url, body, formType) {
  let urlApi = getUrlApi(url)
  let finalHeaders = formType == "FORMDATA" ? headersFile : headers
  let finalBody = formType == "FORMDATA" ? setFormData(body) : setUrlEncodedForm(body)
  console.log(finalBody)
  try {
    let response = await fetch(urlApi, {
      method: 'POST',
      headers: finalHeaders,
      body: finalBody
    });
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.warn(`Error is : ${error}`);
  }
};

// method to delete data from url api
async function deleteService(url, body) {
  let urlApi = getUrlApi(url)
  let finalBody = setUrlEncodedForm(body)
  try {
    let response = await fetch(urlApi, {
      method: 'DELETE',
      headers,
      body: finalBody
    });
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.warn(`Error is : ${error}`);
  }
};

// method to set timeout of request
function timeoutService(ms, promise) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("timeoutService"))
    }, ms)
    promise.then(resolve, reject)
  })
}

export { getServicedetail, getService, postService, deleteService, timeoutService }
