#!/bin/bash

# Define the source files
FILES="test_c03.c ex00/ft_strcmp.c ex01/ft_strncmp.c ex02/ft_strcat.c ex03/ft_strncat.c ex04/ft_strstr.c ex05/ft_strlcat.c"

echo "Compiling..."
cc -Wall -Werror -Wextra $FILES -o test_c03_bin

if [ $? -eq 0 ]; then
    echo "Compilation successful! Running tests..."
    echo "----------------------------------------"
    ./test_c03_bin
    echo "----------------------------------------"
else
    echo "Compilation failed! Please check your code for errors."
fi
