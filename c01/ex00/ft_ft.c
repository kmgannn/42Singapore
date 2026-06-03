# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    < new >                                            :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: kgan <marvin@42.fr>                        +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2026/06/03 18:08:52 by kgan              #+#    #+#              #
#    Updated: 2026/06/03 18:08:52 by kgan             ###   ########.fr        #
#                                                                              #
# **************************************************************************** #



#include <stdio.h>

void    ft_ft(int *nbr)
{

    *nbr = 42;
}

int main(void)
{
    int number = 32;
    
    printf("[Main] The value of 'number' is: %d\n", number);
    printf("[Main] The actual memory address of 'number' is: %p\n\n", &number);
    
    printf("[Main] Calling ft_ft and passing the address...\n");
    ft_ft(&number);
    
    printf("\n[Main] The value of 'number' is now: %d\n", number);
    return (0);
}