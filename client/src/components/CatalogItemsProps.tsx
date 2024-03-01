export type CatalogItemProps = {
    id: number,
    category: string,
    title: string,
    images: string[],
    price: number
}

type CatalogItemsProps = {
    items?: CatalogItemProps[]
}

export default CatalogItemsProps;