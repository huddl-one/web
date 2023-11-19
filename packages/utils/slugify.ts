// Slugify function with support for unicode characters

export const slugify = (str: string) => {
    // Remove accents
    let slug = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // Replace spaces with -
    slug = slug.replace(/\s+/g, "-");
    
    // Remove all non-word chars
    slug = slug.replace(/[^\w-]+/g, "");

    // Replace multiple - with single -
    slug = slug.replace(/--+/g, "-");

    // Trim - from start of text
    slug = slug.replace(/^-+/, "");

    // Trim - from end of text
    slug = slug.replace(/-+$/, "");

    return slug.toLowerCase();
}