#include <unistd.h>

//print function
void put_char(char c)
{
    write(1, &c, 1);
}

//printing character (input nothing/output nothing)
void print_char(void)
{
    put_char('a');
}

int main(void)
{
    print_char();
    return(0);
}
