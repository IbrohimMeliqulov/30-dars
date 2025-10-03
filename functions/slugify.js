export function slugify(text){
    if(!text) return "no-slug";
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g,'-')
        .replace(/[^\w\-]+/g,'')
        .replace(/\-\-+/g,'-')
        .replace(/^-+/,'')
        .replace(/-+$/,'')
}