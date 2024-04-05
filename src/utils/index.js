export const group = (inp, groupLength=3) => {
    const output = Array.from({ length: groupLength }, () => []);;

    inp.forEach((el, index) => {
     
      output[index % groupLength].push(el);
    });
    return output;
};