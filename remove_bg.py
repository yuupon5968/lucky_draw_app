from PIL import Image
import sys
import os

def remove_white_bg(input_path, output_path):
    try:
        img = Image.open(input_path)
        img = img.convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # Change all white (also shades of whites) to transparent
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Processed {input_path} -> {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

if __name__ == "__main__":
    # Process both dog images
    base_dir = r"c:\Users\yuyai\YouTube動画\lucky_draw_app"
    remove_white_bg(os.path.join(base_dir, "dog_full.png"), os.path.join(base_dir, "dog_full_transparent.png"))
    remove_white_bg(os.path.join(base_dir, "dog_closed.png"), os.path.join(base_dir, "dog_closed_transparent.png"))
