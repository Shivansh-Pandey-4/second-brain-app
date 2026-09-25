export interface IContent{
          _id : string;
          type : "tweet"|"document"|"youtube"|"brainthought";
          title : string;
          link ?: string;
          tags ?: string;
          userId : {
               name : string;
               _id : string;
          }
          createdAt : string;
          updatedAt : string;
     }

export interface IData {
     success : boolean;
     msg : string;
     error ?: string;
     contents ?: IContent[];
     pagination ?: {
          currentPage : number;
          limit : number;
          totalDocument : number;
          totalPage : number;
     }

}

export interface ShareModalProps {
     isOpen : boolean;
     onClose : ()=>void;
     refetch ?: ()=>void;
}