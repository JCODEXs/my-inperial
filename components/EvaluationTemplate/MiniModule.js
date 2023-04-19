export default function MinModule(follow) {
  return (
    <div
      style="
          display:flex;
          flex-wrap:wrap;
          align-items: flex-start;
          padding:0.35rem;
          border:1px solid rgb(40,40,40,0.6);
          flex-direction:column;
            min-width:60px
      ; border: 2px solid rgb(20, 20, 20); border-radius: 10px;
        "
    >
      {follow &&
        follow?.module.map((module) => (
      
            <div style="
          display:flex;
          flex-wrap:wrap;
          align-items: flex-start;
         ">📋{module.category}</div>
        
        ))}
    </div>
  );
}

{
  /* <div style="flex:1;text-align:center;"> */
}
{
  /*   <div> */
}
{
  /*     {`${module.items */
}
{
  /*       .map((item) => item.score) */
}
{
  /*       .reduce((sum, value) => sum + value)} / ${module.items.length}`} */
}
{
  /*   </div> */
}
{
  /*   <div> */
}
{
  /*     {( */
}
{
  /*       module.items */
}
{
  /*         .map((item) => item.score) */
}
{
  /*         .reduce((sum, value) => sum + value) / module.items.length */
}
{
  /*     ).toFixed(2)} */
}
{
  /*   </div> */
}
{
  /* </div> */
}
