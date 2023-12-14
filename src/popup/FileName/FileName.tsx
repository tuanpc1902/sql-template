type FileNameProps = {
    name: string;
}

function FileName({name}: FileNameProps){
    return (
        <mark className="absolute top-0 left-0" style={{padding: "0.5rem"}}>{name}</mark>
    )
}
export default FileName;