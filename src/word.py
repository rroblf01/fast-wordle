class Word:
    def __init__(self, text):
        self.text = text

    def compare(self, word2:str):
        print(f"{self.text} - {word2}")
        if (len(self.text) != len(word2)):
            raise ValueError("Words must be of same length")
        result = []
        for i, value in enumerate(word2):
            if self.text[i].lower() == value.lower():
                result.append('green')
            elif value.lower() in self.text.lower():
                result.append('blue')
            else:
                result.append('red')
        
        return result