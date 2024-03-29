/**
 * 文章内容类型
 */
export enum PostBodyType {
    HTML = 'html',
    MD = 'markdown',
}

/**
 * 文章排序类型
 */
export enum PostOrderType {
    /**
     * 最新创建
     */
    CREATED = 'createdAt',
    /**
     * 最近更新
     */
    UPDATED = 'updatedAt',
    /**
     * 最新发布
     */
    PUBLISHED = 'publishedAt',
    /**
     * 评论数量
     */
    COMMENTCOUNT = 'commentCount',
    /**
     * 自定义排序
     */
    CUSTOM = 'custom',
}

/**
 * 树形模型在删除父级后子级的处理方式
 */
export enum TreeChildrenResolve {
    DELETE = 'delete',
    UP = 'up',
    ROOT = 'root',
}
