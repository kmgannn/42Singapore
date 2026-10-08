/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   overall.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kgan <kgan@student.42singapore.sg>         +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/10/08 15:57:55 by kgan              #+#    #+#             */
/*   Updated: 2026/10/08 15:57:55 by kgan             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdio.h>
#include <unistd.h>

void ft_tri_ptr(int ***nbr)
{
    ***nbr = 435;
}

void ft_swap(int *a, int *b)
{
    int temp;
    temp = *a;
    *a = *b;
    *b = temp;
}

void ft_div_mod(int a, int b, int *div, int *mod)
{
    *div = b/a;
    *mod = b%a;
}

void ft_ult_div_mod(int *a, int *b)
{
    int div2 = *b / *a;
    int mod2 = *b % *a;
    *b = div2;
    *a = mod2;
}

// void ft_putstr(char *str)
// {
//     int i = 0;
//     while ( str[i] != '\0')
//     {
//         write(1, &c, 1);    <-- c isn't declared or used
//     }
//     i++;         <-- wrong placement
//     if (str[i] == '\0')
//     {
//         return ('\0');   <-- void cannot have return values
//     }
// }

void ft_putstr(char *str)
{
    int i = 0;
    
    while (str[i] != '\0')
    {
        write(1, &str[i], 1); // 1. Use the actual character address, not 'c'
        i++;                  // 2. Move to the next room INSIDE the loop!
    }
}

int ft_strlen(char *str)
{
    int i = 0;
    while (str[i] != '\0')
    {
        i++;
    }
    return (i);
}

// void ft_rev_int(int *tab, int size)
// {
//     //size counter
//     int i = 0;
//     while (str[i] != '\0')     <-- 1. 'str' doesn't exist here (the parameter is 'tab'). Also, int arrays don't have '\0'!
//     {
//         i++;
//     }
//     return (i);                <-- 2. This is a 'void' function. Also, returning here instantly stops the function, so the code below never runs!
//     
//     //first half
//     int first = str[i];        
//     while (str[i] <= i/2)
//     {
//         i++;
//     }
//
//     //second half
//     int last = str[i];
//     while (str[i] >= i/2)
//     {
//         i--;
//     }
//     
//     //swap pointer
//     int temp = *last;          <-- 3. 'last' is a normal integer, not a pointer. You can't dereference it with '*'.
//     *last = *first;
//     *first = temp;
// }

// void ft_rev_int(int *tab, int size)
// {
//     int i = 0;
//     while (i < (size / 2))           <-- 1. By changing 'size' at the bottom of the loop, you accidentally mess up this math for the next round!
//     {
//         tab[i] = tab[size];          <-- 2. If 'size' is 5, 'tab[5]' is out of bounds! The final element is at index 4 (which is size - 1).
// 
//         // 3. You are swapping the INDEX numbers themselves (making i = 5), rather than swapping the VALUES inside the boxes!
//         int temp = size;             
//         size = i;
//         i = temp;
// 
//         i++;                         <-- 4. Since you swapped 'i' with 'size' above, 'i' is now 5. Doing i++ makes it 6! The loop goes crazy.
//         size--;
//     }
// }

void ft_rev_int(int *tab, int size)
{
    int i = 0;
    while (i <= (size / 2))       // swapping the content inside
    {
        int temp = tab[size-1];  // 6 numbers swaps the final index with the first 
        tab[size-1] = tab[i];
        tab[i] = temp; 
        i++;                         
        size--;
    }
    // this does not work because the actual arrays are not swapped 
    // while (i < (size / 2))
    // {
    //     int index = size - 1;
    //     int temp = index;  // 6 numbers swaps the final index with the first 
    //     index = i;
    //     i = temp; 

    //     i--;                         
    //     index++;
    // }
}

// void ft_sort_int(int *tab, int size)
// {
//     int i = 0;
//     int first = str[i];       <-- 1. 'str' doesn't exist here (the parameter is 'tab'). 
// 
//     while (i < size)          <-- 2. If 'i' reaches the last room (size - 1), then doing tab[i + 1] inside will look in a room that doesn't exist!
//     {
//         if (str[i+1] < first) <-- 3. Why compare against 'first'? In bubble sort, we want to compare neighbor against neighbor: is tab[i+1] smaller than tab[i]?
//         {
//             str[i+1] = temp;  <-- 4. 'temp' has not been created yet! Also, look at the order of your swap below:
//             str[i] = str[i+1];
//             temp = str[i];
//         }
//         i++;
//     }
// }

void ft_sort_int(int *tab, int size)
{
    int turn = 0;
    while (turn < size)
    {
        int i = 0;
        while (i < size-1)
        {
            if (tab[i+1] < tab[i])
            {
                int temp = tab[i];
                tab[i] = tab[i+1];
                tab[i+1] = temp;
            }
            i++;
        }
        turn++;
    }
}

int main(void)
{
    int n1 = 3;

    int *ptr = &n1;
    int **sup_ptr = &ptr;
    int ***tri_ptr = &sup_ptr;

    ft_tri_ptr(tri_ptr);
    printf("%d\n", n1);

    int n2 = 8;
    ft_swap(&n1, &n2);
    printf("After swap: n1 = %d, n2 = %d\n", n1, n2);
    
    int div1;
    int mod1;
    ft_div_mod(n1, n2, &div1, &mod1);
    printf("div = %d, mod = %d\n", div1, mod1);

    // ft_ult_div_mod
    int val1 = 10;
    int val2 = 3;
    ft_ult_div_mod(&val1, &val2);
    printf("div = %d, mod = %d\n", val1, val2);

    // ft_strlen
    printf("length: %d\n", ft_strlen("Goodbye"));

    // ft_rev_int
        int my_array[6] = {0, 10, 20, 30, 40, 50};
        // 1. Create a counter for your loop
        int i = 0;
        
        // 2. Loop through all 5 rooms
        printf("Before: ");
        while (i < 6)
        {
            printf("%d ", my_array[i]);  // Print the number with a space after it
            i++;                         // Move to the next room
        }
        printf("\n"); // Print a new line at the end so it looks nice!

        // Send it to your machine
        ft_rev_int(my_array, 6);

        // 3. Reset your counter back to 0 and loop again to print the 'After'
        i = 0;
        printf("After:  ");
        while (i < 6)
        {
            printf("%d ", my_array[i]);
            i++;
        }
        printf("\n");

}
