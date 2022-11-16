interface DropWrapperParam{
    dropped:any;
    children:any;
}  

function DropWrapper(param:DropWrapperParam) {
    return (
        <div onDragOver={(e) => { e.preventDefault(); } } 
             onDragEnter={(e) => { e.preventDefault(); } } 
             onDrop={(e) => { 
                e.preventDefault();
                param.dropped(e);
             }}>
            {param.children}
        </div>
    );
};
export default DropWrapper;