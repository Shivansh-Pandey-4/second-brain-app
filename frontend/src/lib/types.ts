 export interface Data {
    _id : string;
     type : "tweet"|"document"|"youtube"|"brainthought";
     title : string;
     link ?: string;
     tags ?: string;
     userId : {
         firstName : string;
         _id : string;
     }
     createdAt : string;
     updatedAt : string;
}

export interface ShareModalProps {
     isOpen : boolean;
     onClose : ()=>void;
}