As the evaluator, you are expected to provide a main which will always check:

The return value of the get_next_line is NULL in case of error.
Otherwise, the function returns the line read, always with a \n at the end except if the end of file was reached and does not end with a \n character.
Test all the possible combinations of the following rules:

Large BUFFER_SIZE (>1024)
Small BUFFER_SIZE (< 8, and 1)
BUFFER_SIZE exactly the length of the line to read
1 byte variant (+/-) between the line and the BUFFER_SIZE

Read on stdin

Read from a file

(Multiple/Single) Long line (2k+ characters)

(Multiple/Single) Short line (< 4 characters, even 1)

(Multiple/Single) Empty line

These tests should allow you to assess the robustness of the student's
get_next_line implementation.
If there is an error, the evaluation stops here.