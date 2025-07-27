import re

# For Email Validation

class Validate:
    @staticmethod
    def is_valid_email(email):
        result, message, error = False, "Failed", None
        try:
            pat = "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}"
            if re.match(pat, email):
                result = True
                message = "Success"
            else:
                message = "Failed: Invalid Email"
        except Exception as e:
            message = str(e)
        return result, message