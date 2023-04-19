export default function  adapt  (source,models)  {
    var adapted = [];
    let cumulativeByModel = {}
    Object.entries(source).forEach(([chunk, chunkStats]) =>{
  
 chunkStats["co"]?.forEach((modelStats) => {
   if (models?.includes(modelStats.screenName)) {
 const found = adapted.find(
     (modelData) => modelData.screenName == modelStats.screenName
 );
 const cumulative = cumulativeByModel[modelStats.screenName] || [0,0];
// Get cumulative earnings for the model
cumulativeByModel[modelStats.screenName] = [
  cumulative[0] + modelStats.total.earnings.value,
  cumulative[1] + modelStats.total.workTime.value
];
  if (!found) {
   adapted.push({
     screenName: modelStats.screenName,
     displayName: modelStats.displayName,
     chunks:  {[chunk]: [modelStats.total,modelStats.messengerDetails,{"cumulative":cumulativeByModel[modelStats.screenName]}]} ,
     
 });
} else {
 found.chunks[chunk] = [modelStats.total,modelStats.messengerDetails,{"cumulative":cumulativeByModel[modelStats.screenName]}];
 
}
 //console.log("modelStats.total: ",modelStats);
}})}
);
return [Object.keys(source), adapted];
}

