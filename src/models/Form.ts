export interface InforForm{
    name: string;
    avatar: File;
    location: string;

}
export interface InforStorage{
    name: string;
    avatar: string;
    location: string;

}

export interface NoteForm{
    title:string,
    desc:string,
    start:string,
    end:string
}