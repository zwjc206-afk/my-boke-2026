from PIL import Image, ImageDraw, ImageFont, ImageFilter
from pathlib import Path
import math

OUT = Path("public/assets/images")
OUT.mkdir(parents=True, exist_ok=True)

FONT_CN = "/System/Library/Fonts/Hiragino Sans GB.ttc"
FONT_MED = "/System/Library/Fonts/STHeiti Medium.ttc"


def font(size, medium=False):
    return ImageFont.truetype(FONT_MED if medium else FONT_CN, size)


def gradient(size, top, bottom):
    w, h = size
    img = Image.new("RGB", size, top)
    px = img.load()
    for y in range(h):
        t = y / max(h - 1, 1)
        col = tuple(int(top[i] * (1 - t) + bottom[i] * t) for i in range(3))
        for x in range(w):
            px[x, y] = col
    return img


def grain(img, opacity=16):
    w, h = img.size
    noise = Image.effect_noise((w, h), 18).convert("L")
    overlay = Image.new("RGB", (w, h), (255, 255, 255))
    mask = noise.point(lambda p: min(opacity, max(0, p - 124)))
    return Image.composite(overlay, img, mask)


def rounded_rect(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def save(img, name):
    img = grain(img)
    img.save(OUT / name, quality=88, optimize=True)


def label(draw, xy, text, size=34, fill=(244, 239, 230), medium=False):
    draw.text(xy, text, fill=fill, font=font(size, medium))


def trust_visual_1():
    img = gradient((1120, 1400), (8, 8, 8), (34, 26, 20))
    d = ImageDraw.Draw(img)
    d.rectangle((54, 54, 1066, 1346), outline=(199, 162, 90), width=2)
    label(d, (92, 96), "AI内容工厂", 82, medium=True)
    label(d, (96, 206), "从脚本到线索回收的可复制系统", 32, (199, 162, 90))

    steps = [("01", "选题脚本"), ("02", "数字人/真人"), ("03", "剪辑发布"), ("04", "线索跟进")]
    for i, (num, name) in enumerate(steps):
        y = 360 + i * 185
        rounded_rect(d, (108, y, 1012, y + 126), 8, (23, 24, 22), (82, 70, 52), 2)
        label(d, (146, y + 33), num, 42, (181, 59, 42), True)
        label(d, (250, y + 30), name, 48, medium=True)
        d.line((620, y + 64, 960, y + 64), fill=(72, 72, 66), width=3)
        d.ellipse((944, y + 48, 976, y + 80), fill=(199, 162, 90))
    d.text((96, 1210), "CONTENT SYSTEM", fill=(185, 175, 160), font=font(30, True))
    d.line((96, 1264, 470, 1264), fill=(181, 59, 42), width=8)
    save(img, "visual-trust-content-system.jpg")


def trust_visual_2():
    img = gradient((1120, 1400), (9, 10, 9), (24, 48, 40))
    d = ImageDraw.Draw(img)
    d.rectangle((54, 54, 1066, 1346), outline=(82, 92, 76), width=2)
    label(d, (92, 96), "企业AI增长路径", 72, medium=True)
    label(d, (96, 196), "课程不是终点，业务结果才是交付", 32, (199, 162, 90))
    center = (560, 740)
    for r, col in [(388, (44, 70, 61)), (286, (31, 47, 42)), (178, (17, 23, 21))]:
        d.ellipse((center[0] - r, center[1] - r, center[0] + r, center[1] + r), outline=col, width=24)
    stages = ["认知", "场景", "流程", "内容", "成交"]
    for i, stage in enumerate(stages):
        ang = -90 + i * 72
        x = center[0] + math.cos(math.radians(ang)) * 376
        y = center[1] + math.sin(math.radians(ang)) * 376
        rounded_rect(d, (x - 78, y - 46, x + 78, y + 46), 6, (244, 239, 230), None)
        label(d, (x - 36, y - 25), stage, 34, (17, 16, 14), True)
    label(d, (center[0] - 95, center[1] - 52), "AI", 118, medium=True)
    label(d, (center[0] - 114, center[1] + 72), "GROWTH", 30, (199, 162, 90), True)
    label(d, (92, 1210), "FROM TRAINING TO RESULT", 28, (185, 175, 160), True)
    d.line((92, 1264, 560, 1264), fill=(181, 59, 42), width=8)
    save(img, "visual-trust-growth-map.jpg")


def trust_visual_3():
    img = gradient((1120, 1400), (8, 8, 8), (42, 36, 28))
    d = ImageDraw.Draw(img)
    d.rectangle((54, 54, 1066, 1346), outline=(199, 162, 90), width=2)
    label(d, (92, 96), "课程现场", 82, medium=True)
    label(d, (96, 206), "诊断、流程、交付、复盘", 34, (199, 162, 90))
    board = (128, 350, 992, 878)
    rounded_rect(d, board, 10, (22, 22, 20), (104, 86, 62), 2)
    for i, line in enumerate(["业务场景诊断", "AI工具组合", "内容SOP", "数据复盘"]):
        y = 418 + i * 92
        d.line((190, y + 54, 860, y + 54), fill=(70, 70, 64), width=3)
        d.ellipse((188, y + 4, 230, y + 46), fill=(181, 59, 42))
        label(d, (260, y), line, 40, medium=True)
    d.rectangle((178, 980, 942, 1050), fill=(244, 239, 230))
    d.rectangle((222, 1052, 898, 1090), fill=(199, 162, 90))
    for x in (248, 388, 528, 668, 808):
        d.ellipse((x, 1138, x + 56, 1194), fill=(32, 32, 30))
        d.line((x + 28, 1194, x + 28, 1274), fill=(92, 78, 57), width=5)
    label(d, (92, 1210), "DELIVERABLE TRAINING", 28, (185, 175, 160), True)
    save(img, "visual-trust-training.jpg")


def contact_visual():
    img = gradient((1400, 1050), (12, 14, 13), (33, 55, 48))
    d = ImageDraw.Draw(img)
    d.text((92, 92), "3分钟AI合作诊断", fill=(244, 239, 230), font=font(70, True))
    d.text((96, 184), "问题 / 方法 / 交付 / 结果", fill=(199, 162, 90), font=font(34))
    boxes = [
        ("客户是谁", "定位目标客户与场景"),
        ("痛点是什么", "获客、内容、培训、流程"),
        ("AI怎么做", "工具组合与SOP"),
        ("如何验收", "视频、线索、转化数据")
    ]
    for i, (title, body) in enumerate(boxes):
        x = 100 + (i % 2) * 610
        y = 330 + (i // 2) * 250
        rounded_rect(d, (x, y, x + 500, y + 160), 12, (244, 239, 230), None)
        d.text((x + 34, y + 32), title, fill=(17, 16, 14), font=font(42, True))
        d.text((x + 36, y + 92), body, fill=(76, 71, 63), font=font(28))
    d.line((600, 410, 710, 410), fill=(181, 59, 42), width=6)
    d.line((350, 490, 350, 580), fill=(181, 59, 42), width=6)
    d.line((960, 490, 960, 580), fill=(181, 59, 42), width=6)
    d.line((600, 660, 710, 660), fill=(181, 59, 42), width=6)
    save(img, "visual-contact-diagnostic.jpg")


def news_visuals():
    specs = [
        ("news-ai-default.jpg", "AI NEWS", (21, 25, 24), (181, 59, 42)),
        ("news-openai.jpg", "OPENAI", (16, 16, 15), (199, 162, 90)),
        ("news-google.jpg", "GOOGLE AI", (17, 29, 45), (82, 132, 196)),
        ("news-nvidia.jpg", "NVIDIA AI", (20, 39, 22), (118, 185, 0)),
        ("news-microsoft.jpg", "MICROSOFT AI", (31, 28, 41), (119, 89, 190)),
    ]
    for name, title, bg, accent in specs:
        img = gradient((1200, 760), bg, (8, 8, 8))
        d = ImageDraw.Draw(img)
        d.rectangle((58, 58, 1142, 702), outline=accent, width=2)
        for i in range(9):
            x = 120 + i * 115
            d.line((x, 170, x + 70, 170 + (i % 3) * 80), fill=(70, 70, 66), width=3)
            d.ellipse((x - 10, 160, x + 10, 180), fill=accent)
        d.text((92, 470), title, fill=(244, 239, 230), font=font(72, True))
        d.text((96, 570), "全球AI资讯雷达", fill=(199, 162, 90), font=font(34))
        save(img, name)


trust_visual_1()
trust_visual_2()
trust_visual_3()
contact_visual()
news_visuals()
