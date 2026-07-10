#include <unistd.h>

void put_char(char c)
{
    write(1, &c, 1);
}

// 1. EFFICIENT STRING PRINT (One write call)
void print_string_fast(char *str)
{
    int len = 0;
    
    // Count the length of the string first
    while (str[len] != '\0')
        len++;
        
    // Tell `write` to print 'len' characters all at once!
    write(1, str, len); 
}

// 2. ITERATIVE INTEGER PRINT (Using a buffer array)
void print_integer_iter(int n)
{
    long num = n;
    char buffer[12]; // Buffer large enough for the largest negative int
    int i = 0;

    if (num == 0)
    {
        put_char('0');
        return;
    }
    
    if (num < 0)
    {
        put_char('-');
        num = -num;
    }

    // Extract digits into buffer (they will come out backwards)
    while (num > 0)
    {
        buffer[i] = (num % 10) + '0';
        num = num / 10;
        i++;
    }

    // Print the buffer backwards to get the correct order
    while (i > 0)
    {
        i--;
        put_char(buffer[i]);
    }
}