export default function Module({ module }) {
  return (
    <div
    style="
    display:flex;
    flex-direction:row;
    justify-items:center;
    flex-wrap:wrap;
   justify-content:center
   ;
    "
  >
    <div
      style="display:flex;padding:5px;
      flex-wrap:wrap;
      border-bottom:1px solid gray;;
      border:1px solid gray;
      width:255px;
      background:rgb(30,40,35,0.98);
     
    "
    >
      {module.category}
    </div>
   
      <div  style="display:flex;padding:5px;
       width:255px;
        flex-direction:column;
      border-bottom:1px solid gray;
      border:1px solid gray;flex-wrap:wrap;
    " >
        {module.items.map((item) => (
          <div  style="display:flex;flex-wrap:wrap;flex-direction:row;"
           
          >
            <div style="display:flex;; width:210px ">{item.label}</div>
            <div style="text-align:right;margin-left:0.1rem ;justify-content: flex-end;color:rgb(30,180,230,1)">{item.type}</div>
          </div>
        ))}
        {/* <div style="flex:1;text-align:center;"> */}
        {/*   <div> */}
        {/*     {`${module.items */}
        {/*       .map((item) => item.score) */}
        {/*       .reduce((sum, value) => sum + value)} / ${module.items.length}`} */}
        {/*   </div> */}
        {/*   <div> */}
        {/*     {( */}
        {/*       module.items */}
        {/*         .map((item) => item.score) */}
        {/*         .reduce((sum, value) => sum + value) / module.items.length */}
        {/*     ).toFixed(2)} */}
        {/*   </div> */}
        {/* </div> */}
      </div>
    </div>
  );
}
