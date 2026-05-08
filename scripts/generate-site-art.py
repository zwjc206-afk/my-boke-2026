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


def trust_visual_1():
    img = gradient((1400, 1000), (10, 10, 10), (34, 24, 18))
    d = ImageDraw.Draw(img)
    d.rectangle((72, 72, 1328, 928), outline=(207, 169, 96), width=2)
    d.text((110, 118), "AI内容工厂", fill=(244, 239, 230), font=font(74, True))
    d.text((112, 214), "脚本 / 数字人 / 剪辑 / 发布 / 线索回收", fill=(199, 162, 90), font=font(30))
    for i in range(4):
        x = 120 + i * 305
        y = 355 + (i % 2) * 58
        rounded_rect(d, (x, y, x + 235, y + 300), 18, (28, 29, 27), (108, 92, 68), 2)
        d.rectangle((x + 24, y + 28, x + 211, y + 142), fill=(54, 46, 38))
        d.line((x + 32, y + 176, x + 202, y + 176), fill=(199, 162, 90), width=4)
        d.line((x + 32, y + 216, x + 172, y + 216), fill=(116, 116, 108), width=3)
        d.line((x + 32, y + 252, x + 188, y + 252), fill=(116, 116, 108), width=3)
    for i in range(3):
        x = 360 + i * 305
        d.line((x, 520, x + 60, 520), fill=(181, 59, 42), width=5)
        d.polygon([(x + 60, 520), (x + 43, 508), (x + 43, 532)], fill=(181, 59, 42))
    save(img, "visual-trust-content-system.jpg")


def trust_visual_2():
    img = gradient((1400, 1000), (14, 15, 13), (27, 55, 47))
    d = ImageDraw.Draw(img)
    d.text((86, 86), "企业AI增长路径", fill=(244, 239, 230), font=font(68, True))
    d.text((90, 174), "从课程到业务结果", fill=(199, 162, 90), font=font(32))
    center = (700, 560)
    for r, col in [(330, (42, 65, 57)), (245, (28, 42, 38)), (155, (18, 23, 22))]:
        d.ellipse((center[0] - r, center[1] - r, center[0] + r, center[1] + r), outline=col, width=24)
    labels = ["认知", "工具", "流程", "数据", "成交"]
    for i, label in enumerate(labels):
        ang = -90 + i * 72
        x = center[0] + math.cos(math.radians(ang)) * 315
        y = center[1] + math.sin(math.radians(ang)) * 315
        rounded_rect(d, (x - 84, y - 42, x + 84, y + 42), 10, (244, 239, 230), None)
        d.text((x - 36, y - 24), label, fill=(17, 16, 14), font=font(34, True))
    d.text((center[0] - 90, center[1] - 42), "AI", fill=(244, 239, 230), font=font(92, True))
    d.text((center[0] - 112, center[1] + 54), "MENTOR", fill=(199, 162, 90), font=font(28))
    save(img, "visual-trust-growth-map.jpg")


def trust_visual_3():
    img = gradient((1400, 1000), (9, 9, 9), (43, 37, 29))
    d = ImageDraw.Draw(img)
    d.text((86, 82), "课程现场 × 交付方法", fill=(244, 239, 230), font=font(66, True))
    d.text((90, 170), "把复杂AI能力拆成团队听得懂、做得到的动作", fill=(185, 175, 160), font=font(28))
    for i, width in enumerate([920, 760, 560]):
        y = 300 + i * 150
        rounded_rect(d, (98, y, 98 + width, y + 92), 8, (25, 25, 23), (92, 78, 57), 2)
        d.text((130, y + 27), ["01 诊断业务场景", "02 搭建内容与智能体流程", "03 复盘增长数据"][i], fill=(244, 239, 230), font=font(36, True))
    for x in [1120, 1190, 1260]:
        d.ellipse((x, 370, x + 52, 422), fill=(181, 59, 42))
        d.line((x + 26, 422, x + 26, 720), fill=(199, 162, 90), width=5)
    d.rectangle((1075, 726, 1320, 770), fill=(244, 239, 230))
    d.text((1088, 795), "TRAINING", fill=(199, 162, 90), font=font(26, True))
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
