 
/**
 * 用户操作文章信息表
 */
export interface BlogOperation {
    /**
     * 文章id
     */
    blogId?: number;
    /**
     * 收藏
     */
    collect?: boolean;
    /**
     * 点赞
     */
    favor?: boolean;
    /**
     * 反对
     */
    oppose?: boolean;
    /**
     * 操作的用户id
     */
    userId?: number;
    /**
     * 观看
     */
    watch?: boolean;
}
