
/**
 * 文章表
 */
export interface Blog {
    /**
     * 内容
     */
    content?: string;
    /**
     * 原文链接
     */
    originUrl?: string;
    /**
     * 标签
     */
    tags?: string;
    /**
     * 标题
     */
    title?: string;
    /**
     * 用户id
     */
    userId?: number;
}
