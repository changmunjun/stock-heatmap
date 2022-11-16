import {useEffect,useCallback,useState} from 'react';

interface useHoverReturn{
    isHovering:boolean;
    ref:any;
}

function useHover(){
    const [isHovering, setIsHovering] = useState(false);
    const handleDragOver = useCallback(() => {
                                                setIsHovering(true);
                                              }, []);;
    const handleDragLeave = useCallback(() => {
                                                setIsHovering(false);
                                              }, []);
    const ref = useCallback((node:any) => {
                                                if (node) {
                                                    node.addEventListener('dragover', handleDragOver);
                                                    node.addEventListener('dragleave', handleDragLeave);
                                                    node.addEventListener('drop', handleDragLeave);
                                                }
                                          },
                                [handleDragOver, handleDragLeave]
                            );
    let retVal:useHoverReturn = {isHovering ,ref};                            
    return retVal;                          
}

export default useHover;