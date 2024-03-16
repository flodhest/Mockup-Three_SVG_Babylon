import bpy
import os
import sys

class ModelConverter:
    def __init__(self, input_file_path, output_file_path):
        self.input_file_path = input_file_path
        self.output_file_path = output_file_path

    def export_model(self):
        # Enable required Blender plugins
        self.enable_plugins()

        # Load GLTF file
        bpy.ops.import_scene.gltf(filepath=self.input_file_path)

        # Export as DXF
        bpy.ops.export.dxf(filepath=self.output_file_path)

    def enable_plugins(self):
        bpy.ops.wm.read_factory_settings(use_empty=True)
        for addon in ("io_export_dxf", "io_scene_gltf2"):
            default, enabled = bpy.ops.addon_utils.check(addon)
            if not enabled:
                bpy.ops.addon_enable(module=addon)

# Read file paths from command line arguments
input_file_path = sys.argv[-2]
output_file_path = sys.argv[-1]

# Perform conversion
converter = ModelConverter(input_file_path, output_file_path)
converter.export_model()
