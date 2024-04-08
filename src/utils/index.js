export const group = (inp, groupLength=3) => {
    const output = Array.from({ length: groupLength }, () => []);;

    inp.forEach((el, index) => {
     
      output[index % groupLength].push(el);
    });
    return output;
};



export const tranformUrl = (url = '', width=100)=>{
  if(!url) return null;
  const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`)
  return newUrl
}