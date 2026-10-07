/*       
The memset() function fills the first n bytes of the memory area pointed to by s with the constant byte c.
*/

#include <stddef.h>

void *ft_memset(void *b, int c, size_t len){
    unsigned char *ptr;
    ptr = (unsigned char *)b;

    while (len > 0){
    *ptr = (unsigned char)c;
    ptr++;
    len --;
    }

    return (b);
}
