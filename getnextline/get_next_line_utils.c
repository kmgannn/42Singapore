#include <stdio.h>
#include <unistd.h>
#include ""

find_string_length(){
    size_t str_len = 0;
    
    while (*str){
        str++;
        str_len++;
    }
    return (str_len);
}

string_search(){
    if (!stash)
        return NULL;

    while (*stash != '\n' && *stash != '\0'){
        stash++;
    }
    return ((char *)stash);
}

join_string(){
    ;
}

string_splice(){
    ;
}