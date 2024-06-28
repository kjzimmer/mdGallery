export const getImageUrl = (name) => {
    const url = new URL(`../../../server/uploads/${name}`, import.meta.url).href
    console.log('img url: ', name, `../../../server/uploads/${name}`, url)
    return url
}