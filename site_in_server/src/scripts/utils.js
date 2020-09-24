export const GetBacon = () => {
    const body = fetch('https://baconipsum.com/api/?type=all-meat&paras=2').then( res => res.json() );
    return body;
  };