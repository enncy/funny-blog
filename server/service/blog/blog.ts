import Service from "../service";


interface BlogService extends  Service {

    findByTitle();
    findByAuthor();
    findByDate();
}

export default  BlogService










