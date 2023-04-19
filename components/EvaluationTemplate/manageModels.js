import Module from "./module";
import TemplateHeader from "./templateHeader";
import ChileTemp2 from "./ChileTemp2";
export default function ManageModels({ template }) {
  return (
    <>
      <h2>{template.name}</h2>
      {/* <pre>{JSON.stringify(template, null, 2)}</pre> */}
      {template.modules.map((category) => (
        <Module module={category} />
        ))}
        <ChileTemp2 template={template} />
        {/* <TemplateHeader template={template}/> */}
    </>
  );
}
