void *ft_memcpy(void *dst, const void *src, size_t n){
    unsigned char *d;
    const unsigned char *s;
    size_t i;

    d = (unsigned char *)dst;
    s = (unsigned char *)src;

    if (!dst && !src)
        return (NULL);

    i = 0;
    while (i < n){
        d[i] =s[i];
        i++;
    }
    return (d);
}