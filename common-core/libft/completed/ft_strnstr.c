#include "libft.h"

char *ft_strnstr(const char *big, const char *little, size_t len){
     size_t i;

     i = 0;

     if ( little[0] == '\0')
          return ((char *)big);
     
     while ( i < len ){

          if ( little[i] != big[i])
               return (NULL);
          return ( unsigned(big) - unsigned(little));
     }

};

     The strnstr() function locates the first occurrence of the  null-terminated
     string  little  in  the  string big, where not more than len characters are
     searched.	Characters that appear after a `\0' character are not  searched.

     
     RETURN VALUES
     If little is an empty string, big is returned; if little occurs nowhere  in
     big,  NULL  is  returned; otherwise a pointer to the first character of the
     first occurrence of little is returned.