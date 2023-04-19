import ModelStats from "components/Admin/tempStats/modelStats";
export default function fullModelStats({ model }) {
  return (
    <div
      style="
		      overflow:hidden;
border: solid 1px rgba(100,100,100,0.6);
filter: drop-shadow(0 0 0.75rem black);
	    backdrop-filter:blur(6px);
		      border-radius:10px;z-index:0;padding:0px;background:rgba(10,10,10,0.6);backdrop-filter:blur(6px);margin-top:20px;display:flex;flex-wrap:wrap;"
    >
      <ModelStats selectedModel={model.screenName} />
      <div style="min-width:400px;border-radius:0px;height:400px;flex:1;overflow:hidden;">
        <div
          style="z-index:1;width:100%;
height:100%;
			"
          id="piemoney"
        />
      </div>
      <div
        style="min-width:400px;
border-radius:0px;
			height:400px;flex:1;overflow:hidden;"
      >
        <div style="width:100%;height:100%;" id="pietime" />
      </div>
      <div style="min-width:400px;border-radius:0px;height:400px;flex:1;overflow:hidden;">
        <div
          style="z-index:1;width:100%;
height:100%;
			"
          id="piekpi"
        />
      </div>
    </div>
  );
}
