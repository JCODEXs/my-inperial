import { useUi } from "vStore/ui";
export default function ModelName({ displayName, id }) {
  // const { blurred } = useUi();
  return (
    <div style={`flex:1;${false && "filter:blur(13px);"}`}>
      <a
        href={`https://www.livejasmin.com/en/chat-html5/${displayName}`}
        target="_blank"
        onClick={(e) => {
          e.stopPropagation();
        }}
        style="color:silver;flex:1;"
      >{`${displayName} `}</a>
      <div
        style="flex:1; font-size:80%; 
    white-space: no-wrap;
            "
      >{`id: ${id}`}</div>
    </div>
  );
}
